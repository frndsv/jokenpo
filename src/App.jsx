import React, { useEffect, useState } from 'react';

function Jogo() {
  const valores = ['pedra', 'papel', 'tesoura'];
  const [jogador, setJogador] = useState('');
  const [computador, setComputador] = useState('');
  const [resultado, setResultado] = useState('');
  const [rodadas, setRodadas] = useState(0);
  const [ptsJogador, setPtsJogador] = useState(0);
  const [ptsComputador, setPtsComputador] = useState(0);
  const [vencedor, setVencedor] = useState('');

  function escolha(e) {
    if (e.target && e.target.alt) {
      document.getElementById('section-resultado').classList.add('show');
      document.getElementById('section-acabar').classList.add('show');

      setRodadas(prevRodadas => prevRodadas + 1);
      setJogador(e.target.alt);
      console.log("Jogador escolheu: " + e.target.alt);

      const comp = Math.floor(Math.random() * 3);
      const escolhaComputador = valores[comp];
      setComputador(escolhaComputador);
    }
  }

  function encerrarJogo() {
    document.getElementById('section-replay').classList.add('show');
    document.getElementById('final').classList.add('show');
    document.getElementById('section-resultado').classList.remove('show');
    document.getElementById('btnPedra').disabled = true;
    document.getElementById('btnPapel').disabled = true;
    document.getElementById('btnTesoura').disabled = true;

    if (ptsComputador > ptsJogador) {
      setVencedor('VOCÊ PERDEU :(');
    } else if (ptsJogador > ptsComputador) {
      setVencedor('PARABÉNS, VOCÊ VENCEU :)');
    } else {
      setVencedor('TEMOS UM EMPATE');
    }
  }

  function jogarNovamente() {
    setJogador('');
    setComputador('');
    setResultado('');
    setRodadas(0);
    setPtsJogador(0);
    setPtsComputador(0);

    document.getElementById('btnPedra').disabled = false;
    document.getElementById('btnPapel').disabled = false;
    document.getElementById('btnTesoura').disabled = false;

    document.getElementById('section-replay').classList.remove('show');
    document.getElementById('final').classList.remove('show');
    document.getElementById('section-acabar').classList.remove('show');
    document.getElementById('section-resultado').classList.remove('show');
  }

  useEffect(() => {
    if (jogador !== '' && computador !== '') {
      let resultado = '';
      let jogadorPontos = ptsJogador;
      let computadorPontos = ptsComputador;

      if (jogador === computador) {
        resultado = "Empate";
        jogadorPontos += 1;
        computadorPontos += 1;
      } else if (jogador === "pedra" && computador === "papel") {
        resultado = "Você Perdeu!";
        computadorPontos += 1;
      } else if (jogador === "pedra" && computador === "tesoura") {
        resultado = "Você Ganhou!";
        jogadorPontos += 1;
      } else if (jogador === "papel" && computador === "pedra") {
        resultado = "Você Ganhou!";
        jogadorPontos += 1;
      } else if (jogador === "papel" && computador === "tesoura") {
        resultado = "Você Perdeu!";
        computadorPontos += 1;
      } else if (jogador === "tesoura" && computador === "papel") {
        resultado = "Você Ganhou!";
        jogadorPontos += 1;
      } else if (jogador === "tesoura" && computador === "pedra") {
        resultado = "Você Perdeu!";
        computadorPontos += 1;
      }

      setResultado(resultado);
      setPtsJogador(jogadorPontos);
      setPtsComputador(computadorPontos);
    }
  }, [jogador, computador]);

  useEffect(() => {
    if (vencedor !== '') {
      document.querySelector('#final').classList.add('show');
    }
  }, [vencedor]);

  function renderFinalContent() {
    if (vencedor === "VOCÊ PERDEU :(") {
      return (
        <div className='gif'> 
          <img src="https://i.pinimg.com/originals/c1/97/e1/c197e1fc5e0178579c3ef6e98fb33ab1.gif" alt="Você Perdeu GIF" />
        </div>
      );
    } else if (vencedor === "PARABÉNS, VOCÊ VENCEU :)") {
      return (
        <div className='gif'> 
          <img src="https://i.pinimg.com/originals/9f/93/31/9f933113c551eb759eaa19f64e0170d5.gif" alt="Você Venceu GIF" />
        </div>
      );
    } else if (vencedor === 'TEMOS UM EMPATE') {
      return (
        <div className='gif'>
          <img src="https://i.pinimg.com/originals/ff/bd/21/ffbd2186d86cb0b1b7bfddc9b9acec42.gif" alt="" />
          
        </div>
      );
    } else {
      return (
        <div className='message'>
          <span> Não há GIF para mostrar.</span>
        </div>
      );
    }
  }

  return (
    <>
      <header>
        <h1> PEDRA, PAPEL, TESOURA </h1>
      </header>

      <section className='section-placar'>
        <div className='placar'>
          <div className='jogador'>
            <h1> Jogador 1 </h1>
            <h1> {ptsJogador} </h1>
          </div>

          <div className='computador'>
            <h1> Jogador 2 </h1>
            <h1> {ptsComputador} </h1>
          </div>
        </div>
      </section>

      <section className='jogo'>
        <div className='div-jogo'>
          <div>
            <button id='btnPedra' className='butao pedra' onClick={escolha}>
              <img className='icon' src="pedra.png" alt="pedra" />
            </button>
          </div>
          <div>
            <button id='btnPapel' className='butao papel' onClick={escolha}>
              <img className='icon' src="papel.png" alt="papel" />
            </button>
          </div>
          <div>
            <button id='btnTesoura' className='butao tesoura' onClick={escolha}>
              <img className='icon' src="tesoura.png" alt="tesoura" />
            </button>
          </div>
        </div>
      </section>

      <section id='section-resultado' className='result-section'>
        <div className='container-result'>
          <div>
            <span> <b> Número de jogadas: </b> {rodadas} </span> <br />
          </div>
          <div>
            <span> <b> Você escolheu {jogador} e seu oponente escolheu {computador} </b> </span> <br />
          </div>
          <div>
            <span> <b> Resultado: </b> {resultado} </span>
          </div>
        </div>
      </section>

      <section id='section-acabar'>
        <div>
          <button onClick={encerrarJogo} className='encerrar'> Finalizar Jogo </button>
        </div>
      </section>

      <section id='section-replay'>
        <div>
          <button onClick={jogarNovamente} className='novamente'> Jogar Novamente </button>
        </div>
      </section>

      <section id='final'>
        <div className='final-result'>
          <div>
            <span> {vencedor} </span>
          </div>

          <div>
            <span> Foram {rodadas} rodadas, onde você ganhou {ptsJogador} pontos e o seu oponente {ptsComputador} </span>
          </div>

          {/* Chama a função para renderização condicional */}
          {renderFinalContent()}
        </div>
      </section>
    </>
  );
}

export default Jogo;
