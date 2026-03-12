import { useQuery } from "@tanstack/react-query";
import testCodeService from "../services/testCodeService";
import { ENDPOINTS } from "../configuration/endpoints";

export const useTestCodes = () => {
  return useQuery({
    queryKey: [ENDPOINTS.getTestCodes],
    queryFn: testCodeService.getTestCodes,
    select: (response) => response?.data,
  });
};
