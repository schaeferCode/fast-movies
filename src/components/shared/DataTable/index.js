function FullFeatureTable({ columns, data }) {
  return (
    <table { ...getTableProps() }>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr { ...headerGroup.getHeaderGroupProps() }>
             {headerGroup.headers.map(column => (
               <th { ...column.getHeaderProps() }>
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
  );
}

export default FullFeatureTable;
