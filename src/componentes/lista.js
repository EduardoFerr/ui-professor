import React from 'react';

class ProfessorImagem extends React.Component {
    render() {
        const imagem = this.props.imagem;
        const nome = this.props.nome;
        return (
            <div className="professor-image">
                <img src={imagem.url} alt={nome + ' professor particular'} style={{height: 100+"%", width: 100+"%", display: "inline"}} />
            </div>
        )
    }
}

class ProfessorMaterias extends React.Component {
    render() {
        const materia = this.props.materia;

        return (
            <div>
                {materia.map(item => (
                    <div key={item} className="professor-disciplina">{item}</div>
                ))}
            </div>
        );
    }
}

class ProfessorCurriculo extends React.Component {
    render() {
        const curriculo = this.props.curriculo;

        const curriculoSub = curriculo.length > 650 ?
            curriculo.substring(0, 650).concat('...') :
            curriculo;
        return (
            <div className="middle-curriculo">
                <div className="curriculo-title" style={{textAlign: "left"}} >Currículo</div>
                <div className="curriculo-body" style={{textAlign: "justify", textJustify:"inter-word"}}>
                    {curriculoSub}
                    {curriculo.length>650? <div className="ver-mais">Ver mais</div>: ''}
                </div>
            </div>
        )
    }
}


class ProfessorBusca extends React.Component {
    constructor(props) {
        super(props);
        this.manipularFiltro = this.manipularFiltro.bind(this);
    }

    manipularFiltro(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    render() {
        return (
            <div className="filter-container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div id="escolher-aula-container">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Buscar..."
                                    value={this.props.filtroTexto}
                                    onChange={this.manipularFiltro}
                                />
                            </div>
                        </div>
                    </div>
                </div>

        );
    }
}

class ProfessorLinha extends React.Component {
    render() {
        const professor = this.props.professor;
        return (
            <div className="professor-card professor-container">
                <div className="top-container">
                    <div className="left-container">
                        <ProfessorImagem imagem={professor.imagem} nome={professor.nome}></ProfessorImagem>
                    </div>

                    <div className="middle-container">
                        <div className="professor-name" >{professor.nome}</div>
                        <p className="professor-disciplinas-title">Disciplinas:</p>
                        <div className="professor-disciplinas">
                            <ProfessorMaterias materia={professor.materia}></ProfessorMaterias>
                        </div>
                    </div>

                    <div className="right-container">
                        <div className="professor-rating">
                            <div className="professor-rating-value">{professor.nota}</div>
                            <img className="professor-rating-img" src={require('../img/rating-star.png')} alt="Avaliação professor Aulas Colmeia" />
                        </div>
                    </div>
                </div>
                <ProfessorCurriculo curriculo={professor.curriculo}></ProfessorCurriculo>
                <div className="bottom-container">
                    <div className="bottom-left">
                        <div className="professor-location"><img src={require('../img/marker-icon.png')} alt="Aulas Colmeia reforço escolar em casa" className="professor-location-img" />{professor.bairro}</div>
                    </div>
                    <div className="bottom-right">
                        <div className="professor-escolher-button">Selecionar</div>
                    </div>
                </div>
            </div>
        )
    }
}

class ProfessorTable extends React.Component {
    render() {
        const filtroTexto = this.props.filtroTexto;
        const rows = [];

        this.props.professores.forEach((prof) => {
            if (prof.nome.toLowerCase().indexOf(filtroTexto.toLowerCase()) === -1) {
                return;
            }
            rows.push(
                <div className="professores"  className="col-lg-6 col-md-6" id="professores">
                    <ProfessorLinha
                        professor={prof}
                        key={prof.nome}
                    />
                </div>
            );

        })
        return (
            <div>
                {rows}
            </div>
        )
    }
}



class Lista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            professores: [],
            filtroTexto: '',
        };
        this.manipularFiltro = this.manipularFiltro.bind(this);
    }

    componentDidMount() {
        fetch('https://whispering-escarpment-28788.herokuapp.com/professores')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    professores: res
                })
            })
    }

    manipularFiltro(filtroTexto) {
        this.setState({
            filtroTexto: filtroTexto
        });
    }

    render() {
        return (
            <section id="main">
                <div className="container" style={{ minHeight: 800 + 'px' }} >
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="info-container">
                                <img src={require('../img/header-logo.png')} alt="Aulas Colmeia Logo Principal" className="header-img" />
                                <ProfessorBusca
                                    filtroTexto={this.state.filtroTexto}
                                    onFilterTextChange={this.manipularFiltro}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 60 + "px" }}>
                        <ProfessorTable
                            professores={this.state.professores}
                            filtroTexto={this.state.filtroTexto}
                        />
                    </div>
                </div>
            </section>
        )
    }
}

export default Lista;