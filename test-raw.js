import mysql from 'mysql2/promise';

async function test() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'payments',
    authPlugins: {
      mysql_clear_password: () => Buffer.from('root' + '\0')
    }
  });
}

test().catch(err => {
  console.error('❌ Erro:', err);
  process.exit(1);
});