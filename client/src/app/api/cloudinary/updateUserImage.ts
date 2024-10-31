import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import { Request, Response } from 'express';

const UPDATE_USER_IMAGE = gql`
  mutation UpdateUserImage($id: ID!, $userImg: String!) {
    updateUserImage(id: $id, userImg: $userImg) {
      id
      userImg
    }
  }
`;

export default async function handler(req: Request, res: Response) {
  const { id, userImg } = req.body;
  console.log('Datos recibidos en el backend:', { id, userImg });
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_USER_IMAGE,
      variables: { id, userImg },
    });
    res.status(200).json(data.updateUserImage);
  } catch (error) {
    console.error('Error updating user image:', error);
    res.status(500).json({ error: 'Failed to update user image' });
  }
}
