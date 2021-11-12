import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Persona,
Pedido,
Material,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaMaterialController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/materials', {
    responses: {
      '200': {
        description: 'Array of Persona has many Material through Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Material)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Material>,
  ): Promise<Material[]> {
    return this.personaRepository.materials(id).find(filter);
  }

  @post('/personas/{id}/materials', {
    responses: {
      '200': {
        description: 'create a Material model instance',
        content: {'application/json': {schema: getModelSchemaRef(Material)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Material, {
            title: 'NewMaterialInPersona',
            exclude: ['id'],
          }),
        },
      },
    }) material: Omit<Material, 'id'>,
  ): Promise<Material> {
    return this.personaRepository.materials(id).create(material);
  }

  @patch('/personas/{id}/materials', {
    responses: {
      '200': {
        description: 'Persona.Material PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Material, {partial: true}),
        },
      },
    })
    material: Partial<Material>,
    @param.query.object('where', getWhereSchemaFor(Material)) where?: Where<Material>,
  ): Promise<Count> {
    return this.personaRepository.materials(id).patch(material, where);
  }

  @del('/personas/{id}/materials', {
    responses: {
      '200': {
        description: 'Persona.Material DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Material)) where?: Where<Material>,
  ): Promise<Count> {
    return this.personaRepository.materials(id).delete(where);
  }
}
