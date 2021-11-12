import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Persona, PersonaRelations, Material, Pedido} from '../models';
import {PedidoRepository} from './pedido.repository';
import {MaterialRepository} from './material.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly materials: HasManyThroughRepositoryFactory<Material, typeof Material.prototype.id,
          Pedido,
          typeof Persona.prototype.id
        >;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('MaterialRepository') protected materialRepositoryGetter: Getter<MaterialRepository>,
  ) {
    super(Persona, dataSource);
    this.materials = this.createHasManyThroughRepositoryFactoryFor('materials', materialRepositoryGetter, pedidoRepositoryGetter,);
    this.registerInclusionResolver('materials', this.materials.inclusionResolver);
  }
}
