import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedido,
  Material,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoMaterialController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/material', {
    responses: {
      '200': {
        description: 'Material belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Material)},
          },
        },
      },
    },
  })
  async getMaterial(
    @param.path.string('id') id: typeof Pedido.prototype.id,
  ): Promise<Material> {
    return this.pedidoRepository.material(id);
  }
}
