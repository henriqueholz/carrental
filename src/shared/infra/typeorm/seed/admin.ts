import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
     VALUES('${id}', 'admin', 'admin@rental.com.br', '${password}', true, 'now()', 'XXXXXX')`
  );

  await connection.close;
}

create().then(() => console.log("User admin created!"));
