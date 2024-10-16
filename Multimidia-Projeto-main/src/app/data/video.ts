//banco de dados

export type Video = {
    videoURL: string;
    imageURL: string;
    description: string;
}

const videos: Video[] = [
    {
        videoURL: "video/video03.mp4",
        imageURL: "image/Pikachu.jpeg",
        description: "Pikachu de Ash - O Pikachu de Ash é conhecido por sua lealdade e coragem, exibindo habilidades excepcionais em batalha e ataques elétricos poderosos, como Thunderbolt. É um dos Pokémon mais icônicos da série."
    },
    {
        videoURL: "video/video02.mp4",
        imageURL: "image/MegaLucario.jpeg",
        description: "Mega Lucario - A Mega Evolução de Lucario que aumenta seu poder e velocidade, dando-lhe uma aparência mais feroz e a habilidade Adaptability, que fortalece seus ataques do tipo Lutador e Aço."
    },
    {
        videoURL: "video/video01.mp4",
        imageURL: "image/AshGreninja.jpeg",
        description: "Ash-Greninja - Uma forma especial de Greninja que emerge da profunda ligação com seu treinador Ash, resultando em maior poder e velocidade. Sua aparência se transforma, exibindo marcas em forma de estrela no rosto e uma shuriken de água em suas costas."
    }
]

export default videos;