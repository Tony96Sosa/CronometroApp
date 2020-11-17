import React, { Component } from 'react';
import './cronometro.css';

class Cronometro extends Component{
    state = {
        milisegundos: 0,
        segundos: 0,
        minutos: 0,
        running: false,
        allTimestamp: [],
        started: false,
    }
    
    //Función que se llama con el boton start
    handleStartClick = () => {
        // this.setState({
        //     contando: true,
        // })
        this.timerId = setInterval(() => {
            this.tick()
        }, 100);
        this.setState({
            running: true,
            started: true,
        })
        // if(this.state.running){
        // }
    }
        
    //Función que se llama con el boton stop
    handleStopClick = () => {
        clearInterval(this.timerId);
        this.setState({
            running: false,
        })
    }
    
    //Función que se llama con el boton timestamp
    handleTimestamp = () => {
        const {minutos, segundos, milisegundos, allTimestamp } = this.state;
        const newTimestamp = {minutos, segundos, milisegundos};
        const timestamp = allTimestamp;
        timestamp.push(newTimestamp);
        this.setState({
            allTimestamp: timestamp,
        })
        // this.setState({
        //     capturas: [...this.state.capturas,this.state.tiempo],
        // })
    }
        
    // Función que se llama con el boton reset
    handleReset = () => {
        this.updateTimer(0,0,0);
        this.setState({
            allTimestamp: [],
            started: false,
        })
    }
            
    //Función de actualización del estado
    updateTimer(minutos,segundos,milisegundos) {
        this.setState({
            minutos,
            segundos, 
            milisegundos,
        })
    }

    //Conteo del cronómetro
    tick() {
        let minutos = this.state.minutos;
        let segundos = this.state.segundos; 
        let milisegundos = this.state.milisegundos + 1;

        if(milisegundos === 10){
            milisegundos = 0;
            segundos = segundos + 1;
        }
        if(segundos === 60){
            segundos = 0;
            minutos = minutos + 1;
        }
        if(minutos === 60){
            minutos = 0;
        }
        this.updateTimer(minutos,segundos,milisegundos)
    }

    addZero = (number) => {
        let valor = number < 10 ? `0${number}` : number;
        return valor;
    }
    
    render(){
        let {minutos, segundos, milisegundos, running, allTimestamp, started } = this.state;
        minutos = this.addZero(minutos);
        segundos = this.addZero(segundos);
        milisegundos = this.addZero(milisegundos);

        return(
            <>
                <div className='cronometro-container' >
                    <h3> {`${minutos} : ${segundos} : ${milisegundos}`} </h3>
                </div>
                <button 
                    disabled={running}
                    className={`cronometro-button${running ? 'Desactivado' : 'Activado' }`}
                    onClick={this.handleStartClick} >
                    Start
                </button>
                <button 
                    disabled={!running}
                    className={`cronometro-button${!running ? 'Desactivado' : 'Activado' }`}
                    onClick={this.handleStopClick} >
                    Stop
                </button>
                <button 
                    disabled={!running}
                    className={`cronometro-button${!running ? 'Desactivado' : 'Activado' }`}
                    onClick={this.handleTimestamp} >
                    Timestamp
                </button>
                { started && <button 
                    disabled={running}
                    className={`cronometro-button${running ? 'Desactivado' : 'Activado' }`}
                    onClick={this.handleReset} >
                    Reset
                </button>}

                <ul className='cronometro-lista' >
                    {allTimestamp.map( (time,index) => (
                        <li key={`${time.minutos}+${time.segundos}`} >
                            {`${index+1} -
                            ${this.addZero(time.minutos)} : 
                            ${this.addZero(time.segundos)} : 
                            ${this.addZero(time.milisegundos)}`}
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}

export default Cronometro;