import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Persona} from '../models';
import {PersonaRepository} from '../repositories';
import {llaves} from '../config/llaves'
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt= require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticatorService {
  constructor(@repository(PersonaRepository)
  public persona_repository: PersonaRepository) { }


  GenerarClave() {

    let clave = generador(8, false)
    return clave
  }

  cifrarClave(clave: string) {

    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada

  }

  identificarPersona(usuario: string, clave: string) {
    try {
      let p = this.persona_repository.findOne({
        where: {mail: usuario, clave: clave}
      });
      if (p) {
        return p
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  generarToken(persona:Persona){
    let token=jwt.sign({
      data:{
        id:persona.id,
        mail:persona.mail,
        nombre:persona.nombre,
      }
    },
    llaves.claveJWT)
    return token;
  }

  ValidarToken(token:string){
    try{
      let datos= jwt.verify(token, llaves.claveJWT);
      return datos;
    }catch{

    }
  }
}

