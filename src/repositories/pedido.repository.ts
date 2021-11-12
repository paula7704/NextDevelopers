import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Persona, Material} from '../models';
import {PersonaRepository} from './persona.repository';
import {MaterialRepository} from './material.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Pedido.prototype.id>;

  public readonly material: BelongsToAccessor<Material, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('MaterialRepository') protected materialRepositoryGetter: Getter<MaterialRepository>,
  ) {
    super(Pedido, dataSource);
    this.material = this.createBelongsToAccessorFor('material', materialRepositoryGetter,);
    this.registerInclusionResolver('material', this.material.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
