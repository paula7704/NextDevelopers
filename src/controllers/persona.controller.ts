import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {llaves} from '../config/llaves';
import {Credenciales, Persona} from '../models';
import {PersonaRepository} from '../repositories';
import {AuthenticatorService} from '../services';
const fetch = require('node-fetch');
export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @service(AuthenticatorService)
    public authenticator: AuthenticatorService
  ) { }

  @post('/personas')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersona',
            exclude: ['id'],
          }),
        },
      },
    })
    persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    let clave = this.authenticator.GenerarClave()
    let claveCifrada = this.authenticator.cifrarClave(clave)
    persona.clave = claveCifrada;
    let asunto = 'Confirmación de Usuario creado'
    let p = await this.personaRepository.create(persona);
    fetch(`${llaves.urlNotification}/mailpersona?mensaje=Hola ${p.nombre} su usuario es: ${p.mail} y la contraseña: ${clave}&destinatario=${p.mail}&asunto=${asunto}`)
      .then((data: any) => {
        console.log(data)
      })
    return p
  }

  @post('/identificarPersona', {
    responses: {
      '200': {
        description: 'Identifiación de usuarios'
      }
    }
  })
  async identificarPersona(
    @requestBody() credenciales: Credenciales
  ) {
    let p = await this.authenticator.identificarPersona(credenciales.usuario, credenciales.clave)
    if (p) {
      let token = this.authenticator.generarToken(p);
      return {
        datos: {
          nombre: p.nombre,
          mail: p.mail,
          identificacion: p.identificacion,
          id: p.id
        },
        tk: token
      }
    } else {
      throw new HttpErrors[401]('Datos inválidos');
    }

  }

  @get('/personas/count')
  @response(200, {
    description: 'Persona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }

  @get('/personas')
  @response(200, {
    description: 'Array of Persona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Persona) filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.personaRepository.find(filter);
  }

  @get('/password/{mail}')
  @response(200, {
    description: 'Persona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findByMail(
    @param.path.string('mail') mail: string,
    //@param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    let p = await this.personaRepository.findOne({where: {mail: mail}});
    const h = new Persona()

    if (p) {
      let id = p.id
      let enlace = `${llaves.urlNotification}/passwordreset/${id}`;
      fetch(`${llaves.urlNotification}/mailpersona?mensaje=Hola ${p.nombre} Haga clic aquí para recuperar su contraseña: ${enlace}&destinatario=${p.mail}&asunto=Recuperación de contraseña`)
        .then((data: any) => {
          console.log(data)
        })
      return p

    } else {

    }
    return h;
  }

  @put('/passwordreset/{id}')
  @response(204, {
    description: 'Persona PUT success',
  })
  updatePassById(
    @param.path.string('id') id: string,
    @requestBody() persona: Persona,
  ): Promise<void> {
    let clave = this.authenticator.GenerarClave()
    let claveCifrada = this.authenticator.cifrarClave(clave)
    persona.clave = claveCifrada;
    let asunto = 'Confirmación Cambio de Contraseña'
    this.personaRepository.replaceById(id, persona);
    fetch(`${llaves.urlNotification}/mailpersona?mensaje=Hola ${persona.nombre} su usuario es: ${persona.mail} y la contraseña: ${clave}&destinatario=${persona.mail}&asunto=${asunto}`)
      .then((data: any) => {
        console.log(data)
      })
    return clave;
  }

  @patch('/personas')
  @response(200, {
    description: 'Persona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(persona, where);
  }

  @get('/personas/{id}')
  @response(200, {
    description: 'Persona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    return this.personaRepository.findById(id, filter);
  }

  @patch('/personas/{id}')
  @response(204, {
    description: 'Persona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
  ): Promise<void> {
    await this.personaRepository.updateById(id, persona);
  }

  @put('/personas/{id}')
  @response(204, {
    description: 'Persona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() persona: Persona,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, persona);
  }

  @del('/personas/{id}')
  @response(204, {
    description: 'Persona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}
