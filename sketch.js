let img_personagem;
let img_background;
let img_ini_gotinha;
let fr = 45;
let som_fundo;
let som_pulo;
let gravidade;
let heroi;
let ini_gotinha;
let cenario;
let cenario2;

function preload() {
  img_background = loadImage("imagens/cenario/floresta.png");
  img_heroi = loadImage("imagens/personagem/correndo.png");
  img_ini_gotinha = loadImage("imagens/inimigos/gotinha.png");
  som_fundo = loadSound('sons/trilha_jogo.mp3');
  som_pulo = loadSound('sons/somPulo.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fr);
  gravidade = windowHeight / 35;
  cenario1 = new Cenario(img_background, posX = 0, windowHeight / 80);
  cenario2 = new Cenario(img_background, posX = windowWidth, windowHeight / 80);
  print(windowWidth, windowHeight);
  heroi = cria_heroi(img_heroi, som_pulo, 0.3, 4, 4, windowHeight / 30, windowHeight / 3);
  ini_gotinha = cria_inimigo(img_ini_gotinha, 0.15, 4, 7, windowWidth, windowHeight, windowHeight / 45);
  som_fundo.loop();
}

function keyPressed() {
  if (key == "ArrowUp") {
    heroi.verificar_pular();
  }
}

function draw() {
  func_cenarios(cenario1);
  func_cenarios(cenario2);
  func_herois(heroi);
  func_inimigos(ini_gotinha);
  aplica_gravidade(heroi);
  let colidiu_gotinha = heroi.verifica_colisao(ini_gotinha, 0.60);
  if (colidiu_gotinha) {
    noLoop();
    som_fundo.stop()
  }
}


function cria_heroi(img_heroi, som_pulo, proporcao, num_colunas, num_linhas, vel_pulo, alt_max_pulo) {
  let obj_heroi = new Heroi(img_heroi, som_pulo, proporcao, num_colunas, num_linhas);
  obj_heroi.define_pos_ini(pos_ini_x = 0, pos_ini_y = windowHeight - obj_heroi.altura_pers_prop)
  obj_heroi.define_pular(vel_pulo, alt_max_pulo)
  return obj_heroi
}


function cria_inimigo(imagem_inimigo, proporcao, num_colunas, num_linhas, pos_ini_x, pos_ini_y, velocidade) {
  let obj_ini = new Inimigo(imagem = imagem_inimigo, proporcao = proporcao, num_colunas = num_colunas, num_linhas = num_linhas)
  obj_ini.define_pos_ini(pos_ini_x = pos_ini_x - obj_ini.largura_pers_prop, pos_ini_y = pos_ini_y - obj_ini.altura_pers_prop)
  obj_ini.define_velocidade(velocidade)
  return obj_ini
}


function aplica_gravidade(personagem) {
  if (personagem.pulando == false && personagem.no_chao == false) {
    personagem.pos_atual_y += gravidade;
  }
  if (personagem.pos_atual_y >= personagem.pos_ini_y) {
    personagem.pos_atual_y = personagem.pos_ini_y
    personagem.no_chao = true
    personagem.quant_pulo_atual = 0
  }
}

function func_herois(obj_heroi) {
  obj_heroi.exibe();
  obj_heroi.anim_spriter();
  obj_heroi.pular()
}

function func_inimigos(obj_inimigo) {
  obj_inimigo.exibe()
  obj_inimigo.move();
}

function func_cenarios(obj_cenario) {
  obj_cenario.exibe();
  obj_cenario.anim_spriter();
}
