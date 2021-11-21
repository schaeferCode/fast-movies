import TextInput from "../TextInput";

function FullFeatureList({ children, searchFieldLabel, searchText, updateSearchField }) {
  return (
    <div>
      <TextInput label={ searchFieldLabel } value={ searchText } onChange={ updateSearchField } />
      { children }
      {/* TODO: implement <Pagination /> component */}
    </div>
  );
}

export default FullFeatureList;
