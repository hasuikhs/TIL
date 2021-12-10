import { server } from '../../domain/server.interface';
import { account } from '../../domain/account.interface';
import { user } from '../../domain/user.interface';

interface DataManagerInterface {
  insert(type: string, doc: server | account | user): Promise<any>;
  select(type: string, group?: string): Promise<any | any[]>;
  update(type: string, idx: number, doc: server | account | user): Promise<any>;
  delete(type: string, idx: number): Promise<any>;
}

export default DataManagerInterface;