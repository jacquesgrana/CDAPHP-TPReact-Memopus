
const Column = (props: any) => {

    // faire interface pour type les props
    return (
        <div key={props.column.id} className="">
          <button key={props.column.id} className="btn btn-primary">
            {props.column.label}
          </button>
        </div>
      );
}

export default Column;