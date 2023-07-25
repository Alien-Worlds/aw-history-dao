const { MongoClient } = require("mongodb");

const updateDelta = async (database, contract) => {
  const collectionName = contract + "_deltas";

  console.info(`[${collectionName}] - start update collection`);

  const collection = database.collection(collectionName);

  // drop indexes
  console.info(`[${collectionName}] - dropping indexes`);
  await collection.dropIndex("block_num_1");
  await collection.dropIndex(
    "block_num_1_data_hash_1_code_1_scope_1_table_1_primary_key_1_payer_1_present_1"
  );

  const cursor = collection.find({});
  console.info(`[${collectionName}] - starting to update documents`);
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (doc.block_num) {
      await collection.updateOne(
        { _id: doc._id },
        { $rename: { block_num: "block_number" } }
      );
    }
  }
  console.info(`[${collectionName}] - finished updating documents`);

  // create indexes
  console.info(`[${collectionName}] - creating indexes`);
  await collection.createIndex({ block_number: 1 });
  await collection.createIndex({
    block_number: 1,
    data_hash: 1,
    code: 1,
    scope: 1,
    table: 1,
    primary_key: 1,
    payer: 1,
    present: 1,
  });

  console.info(`[${collectionName}] - finished updating collection `);
};

const updateAction = async (database, contract) => {
  const collectionName = contract + "_actions";

  console.info(`[${collectionName}] - start update collection`);

  const collection = database.collection(collectionName);

  // drop indexes
  console.info(`[${collectionName}] - dropping indexes`);
  await collection.dropIndex("block_num_1");
  await collection.dropIndex(
    "action_hash_1_block_num_1_block_timestamp_1_global_sequence_1_recv_sequence_1_trx_id_1"
  );

  const cursor = collection.find({});
  console.info(`[${collectionName}] - starting to update documents`);
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (doc.block_num || doc.recv_sequence) {
      await collection.updateOne(
        { _id: doc._id },
        {
          $rename: {
            block_num: "block_number",
            recv_sequence: "receiver_sequence",
          },
        }
      );
    }
  }
  console.info(`[${collectionName}] - finished updating documents`);

  // Create a new indexes
  console.info(`[${collectionName}] - creating indexes`);
  await collection.createIndex({ block_number: 1 });
  await collection.createIndex({
    action_hash: 1,
    block_number: 1,
    block_timestamp: 1,
    global_sequence: 1,
    receiver_sequence: 1,
    trx_id: 1,
  });

  console.info(`[${collectionName}] - finished updating collection `);
};

async function main() {
  const uri = "mongodb://localhost:27017/";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("alienworlds_dao"); // db_name

    const contracts = [
      "dao.worlds",
      "escrw.worlds",
      "index.worlds",
      "msig.worlds",
      "prop.worlds",
      "ref.worlds",
      "stkvt.worlds",
      "token.worlds",
    ];

    for (const contract of contracts) {
      await updateAction(database, contract);
      await updateDelta(database, contract);
    }
  } finally {
    await client.close();
  }
}

main().catch(console.error);
