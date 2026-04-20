import { useQuery } from "@tanstack/react-query";
import testCodeService from "../pages/test-code/service/testCodeService";
import { ENDPOINTS } from "../configuration/endpoints";

export const useTestCodes = () => {
  return useQuery({
    queryKey: [ENDPOINTS.getTestCodes],
    queryFn: testCodeService.getTestCodes,
    select: (response) => response?.data,
  });
};
