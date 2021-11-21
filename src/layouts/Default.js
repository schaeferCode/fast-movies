function App(props) {
  return (
    <div className="p-4 h-screen w-screen flex flex-col">
      { props.children }
    </div>
  );
}

export default App;
