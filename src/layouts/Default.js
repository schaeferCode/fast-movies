function App(props) {
  return (
    <div className="p-4 h-screen w-screen flex flex-col mx-auto max-w-5xl">
      { props.children }
    </div>
  );
}

export default App;
