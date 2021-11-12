import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Material, MaterialRelations} from '../models';

export class MaterialRepository extends DefaultCrudRepository<
  Material,
  typeof Material.prototype.id,
  MaterialRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Material, dataSource);
  }
}
