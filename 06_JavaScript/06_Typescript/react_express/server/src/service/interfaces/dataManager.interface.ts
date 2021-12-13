import { server } from '../../domain/server.interface';
import { account } from '../../domain/account.interface';
import { user } from '../../domain/user.interface';

interface DataManagerInterface {
  insert(doc: server | account | user): Promise<any>;
  select(idx?: string): Promise<any>;
  select(group?: string): Promise<any | any[]>;
  update(idx: number, doc: server | account | user): Promise<any>;
  delete(idx: number): Promise<any>;
}

export default DataManagerInterface;