//import node module libraries
import { IconPlus } from "@tabler/icons-react";
import { Button, Col, Row } from "react-bootstrap";

//import custom components
import Flex from "components/common/Flex";

const EcommerceHeader = () => {
  return (
    <Row>
      <Col>
        <Flex
          justifyContent="between"
          alignItems="center"
          className="mb-8 w-100"
          breakpoint="md"
        >
          <div>
            <h1 className="mb-3 h2">मालमत्ता माहिती</h1>
            {/* <DasherBreadcrumb /> */}
          </div>
          <div>
            <Button
              href="#"
              variant="dark"
              className=" d-md-flex align-items-center gap-2"
            >
              <IconPlus size={18} />
              Add Property
            </Button>
          </div>
        </Flex>
      </Col>
    </Row>
  );
};

export default EcommerceHeader;
