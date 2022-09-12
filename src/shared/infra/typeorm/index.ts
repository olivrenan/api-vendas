import { DataSource } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';

import { CreateProducts1656955980248 } from './migrations/1656955980248-CreateProducts';
import { CreateUsers1657120824966 } from './migrations/1657120824966-CreateUsers';
import { CreateUserTokens1657654276020 } from './migrations/1657654276020-CreateUserTokens';
import { CreateCustomers1658257143717 } from './migrations/1658257143717-CreateCustomers';
import { CreateOrders1658416109347 } from './migrations/1658416109347-CreateOrders';
import { AddCustomerIdToOrders1658416284624 } from './migrations/1658416284624-AddCustomerIdToOrders';
import { CreateOrdersProducts1658416711510 } from './migrations/1658416711510-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1658416836296 } from './migrations/1658416836296-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1658416977771 } from './migrations/1658416977771-AddProductIdToOrdersProducts';
// import { AddOrderFieldtoOrders1619889809717 } from './migrations/1619889809717-AddOrderFieldtoOrders';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'test',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1656955980248,
    CreateUsers1657120824966,
    CreateUserTokens1657654276020,
    CreateCustomers1658257143717,
    CreateOrders1658416109347,
    AddCustomerIdToOrders1658416284624,
    CreateOrdersProducts1658416711510,
    AddOrderIdToOrdersProducts1658416836296,
    AddProductIdToOrdersProducts1658416977771,
    // AddOrderFieldtoOrders1619889809717,
  ],
});
