import Axios from 'axios';

interface ValidateGroupResponse {
  isValid: boolean;
}

export default async function validateGroup(groupId: string): Promise<boolean> {
  const { data } = await Axios.get<ValidateGroupResponse>(`/api/validate-group/${groupId}`).catch(
    error => {
      throw new Error(`Unable to validate group: ${error.message}`);
    }
  );

  return data.isValid;
}
