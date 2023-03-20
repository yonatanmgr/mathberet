import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createEditor,
  // eslint-disable-next-line import/named
  Descendant,
  Editor,
  Element as SlateElement,
  Node as SlateNode,
  Point,
  Range,
  Transforms,
  // eslint-disable-next-line import/named
  BaseElement,
} from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { ValueProps, canvasProps } from '@renderer/common/types';
import { useTranslation } from 'react-i18next';
// import MathView from 'react-math-view';
// import ML_KEYBINDINGS from '@common/keybindings';
// import ML_SHORTCUTS from '@common/shortcuts';

type BulletedListElement = {
  type: 'bulleted-list';
  align?: string;
  children: Descendant[];
};

interface CustomElement extends BaseElement {
  type?: string;
  children: Descendant[];
  }

const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
  // '$$': 'math-inline',
  // '---': 'divider',
};

function isDescendant(content: string | string[] | Descendant[] | canvasProps): content is Descendant[] {
  return (content as Descendant[]) !== undefined;
}

const TextBlockContent = ({ content, blockStateFunction }: ValueProps) => {
  const { t, i18n } = useTranslation();
  const valueToSet = isDescendant(content)
    ? content
    : [{ type: 'paragraph', children: [{ text: '' }] }];
  const renderElement = useCallback(
    (
      props: JSX.IntrinsicAttributes & {
        attributes: unknown;
        children: unknown;
        element: unknown;
      },
    ) => <Element {...props} />,
    [],
  );
  const editor = useMemo(
    () => withShortcuts(withReact(withHistory(createEditor()))),
    [],
  );

  const [value, setValue] = useState(valueToSet);

  useEffect(() => {
    blockStateFunction(value);
  }, [value]);

  const handleDOMBeforeInput = useCallback(() => {
    queueMicrotask(() => {
      const pendingDiffs = ReactEditor.androidPendingDiffs(editor);

      const scheduleFlush = pendingDiffs?.some(({ diff, path }) => {
        if (!diff.text.endsWith(' ')) {
          return false;
        }

        const { text } = SlateNode.leaf(editor, path);
        const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1);
        if (!(beforeText in SHORTCUTS)) {
          return;
        }

        const blockEntry = Editor.above(editor, {
          at: path,
          match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
        });
        if (!blockEntry) {
          return false;
        }

        const [, blockPath] = blockEntry;
        return Editor.isStart(editor, Editor.start(editor, path), blockPath);
      });

      if (scheduleFlush) {
        ReactEditor.androidScheduleFlush(editor);
      }
    });
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(currentValue) => setValue(currentValue)}
    >
      <Editable
        spellCheck={false}
        className='textbox'
        onDOMBeforeInput={handleDOMBeforeInput}
        renderElement={renderElement}
        placeholder={t("Text Placeholder")}
        autoFocus
      />
    </Slate>
  );
};

const withShortcuts = (editor: ReactEditor) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text.endsWith(' ') && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range) + text.slice(0, -1);
      const type = (SHORTCUTS as any)[beforeText];

      if (type) {
        Transforms.select(editor, range);

        if (!Range.isCollapsed(range)) {
          Transforms.delete(editor);
        }

        const newProperties: Partial<CustomElement> = {
          type,
        };
        Transforms.setNodes<SlateElement>(editor, newProperties, {
          match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
        });

        if (type === 'list-item') {
          const list: BulletedListElement = {
            type: 'bulleted-list',
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              (n as CustomElement).type === 'list-item',
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          (block as CustomElement).type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: CustomElement = {
            type: 'paragraph',
            children: []
          };
          Transforms.setNodes(editor, newProperties);

          if ((block as CustomElement).type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                (n as CustomElement).type === 'bulleted-list',
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>;
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>;
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>;
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    // case 'divider':
    //   return <div {...attributes} contentEditable={true}>
    //   <hr />
    //   {children}
    // </div>;
    // case 'math-inline':
    //   return <div {...attributes} contentEditable={true}>
    //     <MathView
    //       value='x'
    //       inlineShortcuts={ML_SHORTCUTS}
    //       keybindings={ML_KEYBINDINGS}
    //       onExport={(ref, latex) => latex}
    //       plonkSound={null}
    //       keypressSound={null}
    //     />
    //   {children}
    // </div>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default TextBlockContent;
