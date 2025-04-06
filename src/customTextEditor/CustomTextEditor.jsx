import { useRef, useState } from 'react';

const CustomTextEditor = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');

  const handleCommand = (command) => {
    document.execCommand(command, false, null);
  };

  const handleInput = () => {
    setContent(editorRef.current.innerHTML);
  };

  const handleFontSize = (e) => {
    document.execCommand('fontSize', false, 7); // size 7 is a placeholder
    const fontElements = document.getElementsByTagName('font');
    for (let i = 0; i < fontElements.length; i++) {
      if (fontElements[i].size === '7') {
        fontElements[i].removeAttribute('size');
        fontElements[i].style.fontSize = e.target.value;
      }
    }
  };
  
  const handleColor = (e) => {
    document.execCommand('foreColor', false, e.target.value);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-3">Custom Rich Text Editor</h2>

      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button onClick={() => handleCommand('bold')} className="px-2 py-1 border rounded">B</button>
        <button onClick={() => handleCommand('italic')} className="px-2 py-1 border rounded italic">I</button>
        <button onClick={() => handleCommand('underline')} className="px-2 py-1 border rounded underline">U</button>
        <button onClick={() => handleCommand('insertUnorderedList')} className="px-2 py-1 border rounded">• List</button>

        <div>
             {/* Font Size */}
        <select onChange={handleFontSize} className="border rounded px-2 py-1">
            <option value="12px">12</option>
            <option value="16px" selected>16</option>
            <option value="20px">20</option>
            <option value="24px">24</option>
            <option value="32px">32</option>
        </select>
         {/* Font Color */}
            <input type="color" onChange={handleColor} className="w-8 h-8 p-0 border rounded" />
        </div>

      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[200px] p-3 border rounded bg-white"
        style={{ outline: 'none', cursor: 'text', border: '1px solid #ccc' }}
      ></div>

      {/* Output Preview */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-1">Preview:</h3>
        <div className="p-3 border rounded bg-gray-50" dangerouslySetInnerHTML={{ __html: content }} />
        <div className="p-3 border rounded bg-gray-50" />
            {content}
      </div>
    </div>
  );
};

export default CustomTextEditor;
