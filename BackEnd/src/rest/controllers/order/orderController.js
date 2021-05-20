const config = require('config');
const returnFormat = require('../../../utils/makeReturnFunctionResult');
const postgres = require('../../models/postgres');
const ResFormator = require('../../../utils/formator');
const { object } = require('joi');

const { schema } = config;

exports.getAllOrderList = async (ctx) => {
  try {
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
        DO $$
        DECLARE
          update_menu_id integer := 0;
        BEGIN
        select ${schema}.orderheader.menu_id into update_menu_id from ${schema}.orderheader where id='${body.id}';
        update ${schema}.menu_pic set menu='${body.menu}' where id=update_menu_id;
        update ${schema}.orderheader
        set name='${body.name}', endtime='${body.endtime}', invite_code='${body.invite_code}', describe='${body.describe}'
        where id='${body.id}'
        returning id as update_header_id;
        END $$;
        `;
        console.log(sqlCommand);
        result = await postgres.query(sqlCommand);
        if (result.success === false) {
          ctx.body = new ResFormator(new Error(result.error)).fullResponse;
          return false;
        }
        ctx.body = new ResFormator(result.data).fullResponse;
      }
    } 
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
}

exports.getOrderData = async (ctx) => {
  const { body } = ctx.request;
  try {
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

exports.addOrder = async (ctx) => {
  const { body } = ctx.request;
  try {
    if (body.id_num === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'id_num is empty'}).fullResponse;
    } else if (body.name === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'name is empty'}).fullResponse;
    } else if (body.user_id === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'user_id is empty'}).fullResponse;
    } else if (body.user === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'user is empty'}).fullResponse;
    } else if (body.endtime === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'endtime is empty'}).fullResponse;
    } else if (body.invite_code === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'invite_code is empty'}).fullResponse;
    } else {
      tempBody = Object.assign(body);
      tempBody.id = (orderList.length + 1).toString();
      orderList.push(tempBody);
      ctx.body = new ResFormator(orderList).fullResponse;
    }
    
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.editOrder = async (ctx) => {
  try {
    const { body } = ctx.request;
    if (body.id === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'id is empty'}).fullResponse;
    } else if (body.id_num === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'id_num is empty'}).fullResponse;
    } else if (body.name === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'name is empty'}).fullResponse;
    } else if (body.user_id === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'user_id is empty'}).fullResponse;
    } else if (body.user === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'user is empty'}).fullResponse;
    } else if (body.endtime === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'endtime is empty'}).fullResponse;
    } else if (body.invite_code === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'invite_code is empty'}).fullResponse;
    } else {
      for (let i = 0; i < orderList.length; i += 1) {
        if (body.id === orderList[i].id) {
          orderList[i] = Object.assign(body);
          break;
        }
      }
      ctx.body = new ResFormator('success').fullResponse;
    } 
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.deleteOrder = async (ctx) => {
  try {
    const { body } = ctx.request;
    if (body.id === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'id is empty'}).fullResponse;
    } else {
      for (let i = 0; i < orderList.length; i += 1) {
        if (body.id === orderList[i].id) {
          orderList.splice(i, 1);
          break;
        }
      }
      ctx.body = new ResFormator('success').fullResponse;
    }
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.addOrderItem = async (ctx) => {
  try {
    const { body } = ctx.request;
    if (body.orderID === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'orderID is empty'}).fullResponse;
    } else if (body.user_name === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'user_name is empty'}).fullResponse;
    } else if (body.item_name === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'item_name is empty'}).fullResponse;
    } else if (body.price === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'price is empty'}).fullResponse;
    } else {
      tempBody = Object.assign(body);
      tempBody.id = (orderItemList.length + 1).toString();
      orderItemList.push(tempBody);
      ctx.body = new ResFormator(orderItemList).fullResponse;
    }
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};