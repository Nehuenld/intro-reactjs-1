import React from 'react';

class ItemCardForm extends React.Component {
  constructor(props) {
    super(props);
    // Inicializar el estado
    this.state = {
      items: [
        { title: 'Title 1', description: 'Description 1' },
        { title: 'Title 2', description: 'Description 2' },
        { title: 'Title 3', description: 'Description 3' },
      ],
      value: '',
    };
    // Creamos referencias para los inputs del formulario
    this.inputTitle = React.createRef();
    this.inputDescription = React.createRef();
    // Handlers
    this.handleItemCardSubmit = this.handleItemCardSubmit.bind(this);
    // Evento para detectar cambio de texto, en nuestro input controlado
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentDidMount() {
    // Cuando termina de dibujar el HTML de la pagina, seteamos el foco en el campo deseado.
    this.inputTitle.current.focus();
  }

  handleTextChange(e) {
    this.setState({ value: e.target.value });
  }

  handleItemCardSubmit(e) {
    // Evitamos comportamiento por defecto de formularios
    e.preventDefault();
    // Creamos nuevo item tomando valores por referencias de los inputs
    const newItem = {
      title: this.inputTitle.current.value,
      description: this.inputDescription.current.value,
    };
    // Agregamos el nuevo item a los YA existentes
    this.setState(prevState => ({ items: prevState.items.concat(newItem) }));
    // Limpiamos valores de ambos inputs
    this.inputTitle.current.value = '';
    this.inputDescription.current.value = '';
    // Seteamos el foco en el campo titulo
    this.inputTitle.current.focus();
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.items.map((item, index) => <li key={index}>{item.title}</li>)
          }
        </ul>
        <form onSubmit={this.handleItemCardSubmit}>
          <div className="form-group row">
            <label htmlFor="inputTitle" className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input className="form-control" ref={this.inputTitle} id="inputTitle" type="text" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-10">
              <input className="form-control" ref={this.inputDescription} id="inputDescription" type="text" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputControlled" className="col-sm-2 col-form-label">Controlled Input</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                id="inputControlled"
                onChange={this.handleTextChange}
                type="text"
                value={this.state.value} />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ItemCardForm;
