import { gql } from '@apollo/client';

export const GET_LEADS = gql`
query getLeads{
  leads(pagination:{
    pageSize:500
  }){
    data{
      id
      attributes{
        Name
        email
        Source
        Status
        date
        Time	
        Notes
        createdAt
        updatedAt
      }
    }
  }
}
`;

export const CREATE_LEAD = gql`
mutation createLead($data : LeadInput!){
  createLead(data:$data){
    data{
      id
      attributes{
        Name
        email
        Source
        Status
        Notes  
      }
    }
  }
}
`;
export const DELETE_LEAD = gql`
mutation deleteLead($id:ID!){
  deleteLead(id:$id){
    data{
      id
    }
  }
}`;

export const UPDATE_LEAD = gql`
mutation updateLead($id: ID!, $data: LeadInput!){
  updateLead(id:$id,data:$data){
    data{
      id
      attributes{
        Name
        email
        Source
        Status
        Notes
      }
    }
  }
}
`;