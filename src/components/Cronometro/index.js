import React, { Component } from 'react';
import './cronometro.css';

class Cronometro extends Component{
    state = {
        tiempo: {
            milisegundos: 0,
            segundos: 0,
            minutos: 0,
        },
        tiempoStop: {
            segundos: 0,
            minutos: 0,
        },
        contando: false,
        capturas: [],
    }
    
    //Función que se llama con el boton start
    handleStartClick = () => {
        this.setState({
            contando: true,
        })
        this.timerId = setInterval(
            ()  => this.tick(),
            10
        )
    }
        
    //Función que se llama con el boton stop
    handleStopClick = () => {
        this.setState({
            contando: false,
        })
        clearInterval(this.timerId);
    }
    
    //Función que se llama con el boton timestamp
    handleTimestamp = () => {
        this.setState({
            capturas: [...this.state.capturas,this.state.tiempo],
        })
    }
        
    // Función que se llama con el boton reset
    handleReset = () => {
        this.setState({
            tiempo: {
                milisegundos: 0,
                segundos: 0,
                minutos: 0,
            },
            contando: false,
            capturas: [],
        })
        clearInterval(this.timerId);
    }
            
    //Función de actualización del estado
    updateTimer(milisegundos,segundos, minutos) {
        milisegundos += 1;
        if (milisegundos>99){
            segundos++;
            milisegundos=0
        }
        if (segundos>59){
            minutos++;
            segundos=0
        }
        let result = {milisegundos,minutos,segundos}

        return result;
    }

    //Conteo del cronómetro
    tick() {
        this.setState({
            tiempo: this.updateTimer(this.state.tiempo.milisegundos,this.state.tiempo.segundos,this.state.tiempo.minutos),
        })
    }
    
    render(){
        return(
            <div className='cronometro-container' >
                <h2>{this.state.tiempo.minutos} : {this.state.tiempo.segundos} : {this.state.tiempo.milisegundos} </h2>
                <button 
                    className='cronometro-button'
                    disabled={this.state.contando}
                    onClick={this.handleStartClick} >
                        { !this.state.contando
                            ? 'Start'
                            : 'Contando...'
                        }
                </button>
                <button 
                    className='cronometro-button'
                    disabled={!this.state.contando}
                    onClick={this.handleStopClick} >Stop
                </button>
                <button 
                    className='cronometro-button'
                    disabled={!this.state.contando}
                    onClick={this.handleTimestamp} >Timestamp
                </button>
                <button 
                    className='cronometro-button'
                    disabled={this.state.contando}
                    onClick={this.handleReset} >Reset
                </button>
                <ul>
                    {this.state.capturas.map((captura, index) =>(
                        <li key={index}>
                            {`${index + 1} -    ${captura.minutos} : ${captura.segundos} : ${captura.milisegundos}`}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Cronometro;