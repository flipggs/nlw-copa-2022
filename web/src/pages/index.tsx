import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { api } from "../lib/axios"

interface HomeProps {
  pollCount: number;
  guessCount: number;
  userCount: number;
}
  
import appPreview from '../assets/app-nlw-copa-preview.png';
import LogoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import iconCheckSvg from '../assets/icon-check.svg';

export default function Home({ pollCount, guessCount, userCount }: HomeProps) {
  const [pollTitle, setPollTitle] = useState('');

  const createPoll = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: pollTitle
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert("Bolão criado com sucesso, o código foi copiado para a área de transferência!");
      setPollTitle('');
      
    } catch (error) {
      console.log({ error });
      alert('Falaha ao criar o bolão');
    }

  }
  
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={LogoImg} alt="Logo" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1> 
        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPoll} className="mt-10 flex gap-2">
          <input 
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text" 
            value={pollTitle}
            onChange={(e) => setPollTitle(e.target.value)}
            placeholder="Qual nome do seu bolão?"
            required
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700" 
            type="submit"
          >Criar meu bolão</button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas
        </p>


        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckSvg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{pollCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckSvg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image 
        src={appPreview} 
        alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
        quality={100} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [pollsResponse, guessesResponse, userResponse] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count')
  ]);
  

  
  return {
    props: {
      pollCount: pollsResponse.data.count,
      guessCount: guessesResponse.data.count,
      userCount: userResponse.data.count
    }
  }
}