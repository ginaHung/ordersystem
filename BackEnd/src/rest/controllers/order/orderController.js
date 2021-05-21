const config = require('config');
const returnFormat = require('../../../utils/makeReturnFunctionResult');
const postgres = require('../../models/postgres');
const ResFormator = require('../../../utils/formator');
const { object } = require('joi');

const { schema } = config;

exports.getAllOrderList = async (ctx) => {
  try {
    let result = null;
    const sqlCommand = `
    select *
    from  ${schema}.orderheader
    order by id_num;
    `;
    console.log(sqlCommand);
    result = await postgres.query(sqlCommand);
    if (result.success === false) {
      ctx.body = new ResFormator(new Error(result.error)).fullResponse;
    }
    ctx.body = new ResFormator(result.data).fullResponse;
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.getMyOrder = async (ctx) => {
  const { body } = ctx.request;
  try {
    let result = null;
    if (body.user_id === undefined) {
      ctx.body = new ResFormator(new Error('user_id is empty')).fullResponse;
    } else {
      const sqlCommand = `
      select *
      from  ${schema}.orderheader
      where user_id = '${body.user_id}'
      order by id_num;`;
      console.log(sqlCommand);
      result = await postgres.query(sqlCommand);
      if (result.success === false) {
        ctx.body = new ResFormator(new Error(result.error)).fullResponse;
        return false;
      }
      ctx.body = new ResFormator(result.data).fullResponse;
    }
    
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.saveOrder = async (ctx) =>{
  const { body } = ctx.request;
  try {
    let result = null;
    if (body.id_num === undefined) {
      ctx.body = new ResFormator(new Error('id_num is empty')).fullResponse;
    } else if (body.name === undefined) {
      ctx.body = new ResFormator(new Error('name is empty')).fullResponse;
    } else if (body.user_id === undefined) {
      ctx.body = new ResFormator(new Error('user_id is empty')).fullResponse;
    } else if (body.user_name === undefined) {
      ctx.body = new ResFormator(new Error('user_name is empty')).fullResponse;
    } else if (body.describe === undefined) {
      ctx.body = new ResFormator(new Error('describe is empty')).fullResponse;
    } else if (body.endtime === undefined) {
      ctx.body = new ResFormator(new Error('endtime is empty')).fullResponse;
    } else if (body.invite_code === undefined) {
      ctx.body = new ResFormator(new Error('invite_code is empty')).fullResponse;
    } else if (body.menu === undefined) {
      ctx.body = new ResFormator(new Error('menu is empty')).fullResponse;
    } else {
      if (body.id === undefined || body.id ==="") { //add
        const sqlCommand = `
        DO $$
        DECLARE
          new_menu_id integer := 0;
        BEGIN
        insert into ${schema}.menu_pic (menu) values ('${body.menu}') returning id into new_menu_id; 
        
        insert into ${schema}.orderheader
        (id_num, name, user_id, user_name, describe, endtime, invite_code, menu_id, class_1, class_2, class_3, class_4, class_5)
        values ('${body.id_num}', '${body.name}', '${body.user_id}', '${body.user_name}', '${body.describe}', 
          '${body.endtime}', '${body.invite_code}', new_menu_id, '${body.class_1}', '${body.class_2}', 
          '${body.class_3}', '${body.class_4}', '${body.class_5}');
        END $$;
        select id from ${schema}.orderheader header where id_num='${body.id_num}' and name='${body.name}' and user_id='${body.user_id}';`;
        
        console.log(sqlCommand);
        result = await postgres.queryReturnAllResult(sqlCommand);
        if (result.success === false) {
          ctx.body = new ResFormator(new Error(result.error)).fullResponse;
          return false;
        }
        ctx.body = new ResFormator(result.data[1].rows[0]).fullResponse;
  
      } else {  //edit
        const sqlCommand = `
        BEGIN;
        update ${schema}.menu_pic set menu='${body.menu}'
        where id in (select menu_id from ${schema}.orderheader where id='${body.id}');
        update ${schema}.orderheader
        set name='${body.name}', endtime='${body.endtime}', invite_code='${body.invite_code}', describe='${body.describe}'
        where id='${body.id}';
        END;
        select id from ${schema}.orderheader where id='${body.id}';
        `;
        
        console.log(sqlCommand);
        result = await postgres.queryReturnAllResult(sqlCommand);
        if (result.success === false) {
          ctx.body = new ResFormator(new Error(result.error)).fullResponse;
          return false;
        }
        ctx.body = new ResFormator(result.data[4].rows[0]).fullResponse;
      }
    } 
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
}

exports.getOrderData = async (ctx) => {
  const { body } = ctx.request;
  try {
    let result = null;
    if (body.header_id === undefined) {
      ctx.body = new ResFormator(new Error('header_id is empty')).fullResponse;
    } else {
      const sqlCommand = `
      select header.*, pic.menu
      from  ${schema}.orderheader header
      left join ${schema}.menu_pic pic on pic.id = header.menu_id
      where header.id = '${body.header_id}';
      `;
      console.log(sqlCommand);
      result = await postgres.query(sqlCommand);
      if (result.success === false) {
        ctx.body = new ResFormator(new Error(result.error)).fullResponse;
        return false;
      }
      ctx.body = new ResFormator(result.data).fullResponse;
    }
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
}

exports.getOrderItem = async (ctx) => {
  const { body } = ctx.request;
  try {
    let result = null;
    if (body.header_id === undefined) {
      ctx.body = new ResFormator(new Error('header_id is empty')).fullResponse;
    } else {
      const sqlCommand = `
      select *
      from ${schema}.orderitem item
      where item.header_id = '${body.header_id}'
      order by id;
      `;
      console.log(sqlCommand);
      result = await postgres.query(sqlCommand);
      if (result.success === false) {
        ctx.body = new ResFormator(new Error(result.error)).fullResponse;
        return false;
      }
      ctx.body = new ResFormator(result.data).fullResponse;
    }
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
}

exports.saveRow = async (ctx) => {
  const { body } = ctx.request;
  try {
    if (body.id === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'id is empty'}).fullResponse;
    } else {
      let result = null;
      let insertCommand = `
      insert into ${schema}.orderitem
        (header_id, user_name, create_id, item_name, class_1, class_2, class_3, class_4, class_5, price, remark)
        values `;
      let valuesSQL = [];
      for (let i = 0; i < body.addRow.length; i += 1) {
        const tempStr = `
        ('${body.id}', '${body.addRow[i].user_name}', '${body.addRow[i].create_id}', '${body.addRow[i].item_name}',
        '${body.addRow[i].class_1}', '${body.addRow[i].class_2}', '${body.addRow[i].class_3}', '${body.addRow[i].class_4}', '${body.addRow[i].class_5}',
        '${body.addRow[i].price}', '${body.addRow[i].remark}')`;
        valuesSQL.push(tempStr);
      }
      valuesSQL = valuesSQL.join(',');
      let updateSQL = [];
      for (let i = 0; i < body.editRow.length; i += 1) {
        const tempStr = `
        update ${schema}.orderitem set user_name='${body.editRow[i].user_name}', item_name='${body.editRow[i].item_name}',
        class_1='${body.editRow[i].class_1}', class_2='${body.editRow[i].class_2}', class_3='${body.editRow[i].class_3}',
        class_4='${body.editRow[i].class_4}', class_5='${body.editRow[i].class_5}', price='${body.editRow[i].price}',
        remark='${body.editRow[i].remark}' where id='${body.editRow[i].id}'`;
        updateSQL.push(tempStr);
      }
      updateSQL = updateSQL.join(';');
      let deleteSQL = '';
      if (body.delRow.length > 0) {
        deleteSQL = `
        delete from ${schema}.orderitem where id in ('${body.delRow.join(',')}')`;
      }
      
      insertCommand = `${insertCommand} ${valuesSQL}; ${updateSQL}; ${deleteSQL};`;
      const sqlCommand = `
      DO $$
      BEGIN
      ${insertCommand}
      END $$
      `;
      console.log(sqlCommand);
      result = await postgres.query(sqlCommand);
      if (result.success === false) {
        ctx.body = new ResFormator(new Error(result.error)).fullResponse;
        return false;
      }
      ctx.body = new ResFormator(result.data).fullResponse;
    } 
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.deleteOrder = async (ctx) => {
  const { body } = ctx.request;
  try {
    if (body.id === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'id is empty'}).fullResponse;
    } else {
      const sqlCommand = `
      BEGIN;
      delete from ${schema}.orderheader where id='${body.id}';
      delete from ${schema}.orderitem where header_id='${body.id}';
      delete from ${schema}.menu_pic where id in ()
      END;
      `;

    }
  }catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};
