import { server } from '../../domain/server.interface';
import { account } from '../../domain/account.interface';
import { user } from '../../domain/user.interface';

interface DataManagerInterface {
  insert(doc: server | account | user): Promise<any>;

  select(): Promise<any[]>;               // overload signature
  select(idx: number): Promise<any>;      // overload signature
  select(group: string): Promise<any[]>;  // overload signature
  
  update(idx: number, doc: server | account | user): Promise<any>;
  
  delete(idx: number): Promise<any>;
}

export default DataManagerInterface;