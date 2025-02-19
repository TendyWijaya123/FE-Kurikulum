import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import IlmuPengetahuanTable from '../../components/Common/Ipteks/IlmuPengetahuanTable';
import TeknologiTable from '../../components/Common/Ipteks/TeknologiTable';
import SeniTable from '../../components/Common/Ipteks/SeniTable';
import Accordion from '../../components/Accordion/Accordion';

const Ipteks = () => {
  return (
    <DefaultLayout title="IPTEKS">
      <div className="font-semibold">
        <Accordion title="Ilmu Pengetahuan">
          <IlmuPengetahuanTable />
        </Accordion>

        <Accordion title="Teknologi">
          <TeknologiTable />
        </Accordion>

        <Accordion title="Seni">
          <SeniTable />
        </Accordion>
      </div>
    </DefaultLayout>
  );
};

export default Ipteks;