function Modal({children, handleClose}) {
  return (
    <div className="flex bg-blue-50 flex-col flex-1">
      <header className="flex justify-end p-2 bg-blue-500">
        <button onClick={handleClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          X
        </button>
      </header>

      <div className="flex-1 p-4 flex justify-center flex-col items-center">
        {children}
      </div>
      
      <footer className="bg-green-700">
        My favorite color is green
      </footer>
    </div>
  )
}

export default Modal;
