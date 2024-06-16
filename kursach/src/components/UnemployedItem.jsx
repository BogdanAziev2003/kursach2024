function UnemployedItem(props) {



  return (
    <tr key={props.row.id}>
      <td>{props.row.id}</td>
      <td>{props.row.name}</td>
      <td>{props.row.surname}</td>
      <td>{props.row.age}</td>
      <td>{props.row.profession}</td>
      <td>{props.row.education}</td>
      <td>{props.row.palceoflastwork}</td>
      <td>{props.row.positionoflastwork}</td>
      <td>{props.row.reasonfordismissal}</td>
      <td>{props.row.familystatus}</td>
      <td>{props.row.livingconditions}</td>
      <td>{props.row.phone}</td>
      <td>{props.row.email}</td>
      <td>{props.row.requirements}</td>
      <td>
      </td>
    </tr>
  )
}

export default UnemployedItem
