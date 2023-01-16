import type { NextPage } from "next";
import { Block, Card, Col, ColGrid } from "@tremor/react";

const Dashboard: NextPage = () => {
  return (
    <>
      <ColGrid
        numColsMd={2}
        numColsLg={3}
        gapX="gap-x-6"
        gapY="gap-y-6"
        marginTop="mt-6"
      >
        <Card>
          <div className="h-28" />
        </Card>
        <Card>
          <div className="h-28" />
        </Card>
        <Card>
          <div className="h-28" />
        </Card>
      </ColGrid>
      <Block marginTop="mt-6">
        <ColGrid numColsLg={6} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
          <Col numColSpanLg={4}>
            <Card hFull={true}>
              <div className="h-60" />
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Block spaceY="space-y-6">
              <Card>
                <div className="h-96" />
              </Card>
            </Block>
          </Col>
        </ColGrid>
      </Block>
    </>
  );
};

export default Dashboard;
