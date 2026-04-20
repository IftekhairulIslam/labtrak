import { ENDPOINTS } from "../../../configuration/endpoints";
import httpService from "../../../services/httpService";

class TestCodeService {
  getTestCodes() {
    return httpService.get(ENDPOINTS.getTestCodes);
  }
}

const testCodeService = new TestCodeService();
export default testCodeService;
