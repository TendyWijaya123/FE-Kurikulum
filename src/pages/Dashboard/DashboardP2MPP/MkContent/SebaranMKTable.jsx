import { Table, Typography, Row, Col, Spin, Select, Empty } from "antd";
import Accordion from "../../../../components/Accordion/Accordion";

const { Title } = Typography;
  
  // Kolom tabel sesuai format gambar
  const columns = [
    {
      title: "Kode MK",
      dataIndex: "kode",
      key: "kode",
    },
    {
      title: "Mata Kuliah",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "SKS",
      children: [
        {
          title: "Teori",
          dataIndex: "total_teori",
          key: "total_teori",
        },
        {
          title: "Praktik",
          dataIndex: "total_praktek",
          key: "total_praktek",
        },
        {
          title: "Total",
          dataIndex: "total_sks",
          key: "total_sks",
        },
      ],
    },
    {
      title: "Beban Belajar (menit/minggu)",
      children: [
        {
          title: "Teori",
          children: [
            {
              title: "BT",
              dataIndex: "teori_bt",
              key: "teori_bt",
            },
            {
              title: "PT",
              dataIndex: "teori_pt",
              key: "teori_pt",
            },
            {
              title: "M",
              dataIndex: "teori_m",
              key: "teori_m",
            },
          ],
        },
        {
          title: "Praktik",
          children: [
            {
              title: "BT",
              dataIndex: "praktek_bt",
              key: "praktek_bt",
            },
            {
              title: "PT",
              dataIndex: "praktek_pt",
              key: "praktek_pt",
            },
            {
              title: "M",
              dataIndex: "praktek_m",
              key: "praktek_m",
            },
          ],
        },
        {
          title: "Total",
          dataIndex: "total_beban",
          key: "total_beban",
        },
      ],
    },
  ];

const SebaranMKTable = ({dataMatakuliah})=>{
  
    // Mengelompokkan mata kuliah berdasarkan semester
    const groupedData = {};
    dataMatakuliah.forEach((mk) => {
        if (!groupedData[mk.semester]) {
        groupedData[mk.semester] = [];
        }
        groupedData[mk.semester].push(mk);
    });
    
    // Membuat array dua tabel per baris
    const semesterKeys = Object.keys(groupedData).map(Number);
    const tableRows = [];
    for (let i = 0; i < semesterKeys.length; i += 2) {
        tableRows.push([semesterKeys[i], semesterKeys[i + 1]]);
    }

    const getSummaryData = (data) => {
        if (!data || data.length === 0) return {};
    
        return data.reduce((acc, curr) => {
            acc.total_teori = (acc.total_teori || 0) + (curr.total_teori || 0);
            acc.total_praktek = (acc.total_praktek || 0) + (curr.total_praktek || 0);
            acc.total_sks = (acc.total_teori || 0) + (acc.total_praktek || 0);
    
            acc.teori_bt = (acc.teori_bt || 0) + (curr.teori_bt || 0);
            acc.teori_pt = (acc.teori_pt || 0) + (curr.teori_pt || 0);
            acc.teori_m = (acc.teori_m || 0) + (curr.teori_m || 0);
    
            acc.praktek_bt = (acc.praktek_bt || 0) + (curr.praktek_bt || 0);
            acc.praktek_pt = (acc.praktek_pt || 0) + (curr.praktek_pt || 0);
            acc.praktek_m = (acc.praktek_m || 0) + (curr.praktek_m || 0);
    
            acc.total_beban = (acc.total_beban || 0) + ((curr.teori_bt || 0) + (curr.teori_pt || 0) + (curr.teori_m || 0) + (curr.praktek_bt || 0) + (curr.praktek_pt || 0) + (curr.praktek_m || 0));
    
            return acc;
        }, {});
    };

    const calculateRowTotal = (row) => {
        return {
            ...row,
            total_teori: row.total_teori || 0,
            total_praktek: row.total_praktek || 0,
            total_sks: (row.total_teori || 0) + (row.total_praktek || 0),
    
            teori_bt: row.teori_bt || 0,
            teori_pt: row.teori_pt || 0,
            teori_m: row.teori_m || 0,
    
            praktek_bt: row.praktek_bt || 0,
            praktek_pt: row.praktek_pt || 0,
            praktek_m: row.praktek_m || 0,
    
            total_beban:
                (row.teori_bt || 0) +
                (row.teori_pt || 0) +
                (row.teori_m || 0) +
                (row.praktek_bt || 0) +
                (row.praktek_pt || 0) +
                (row.praktek_m || 0),
        };
    };
    
    const updatedGroupedData = {};
    Object.keys(groupedData).forEach((semester) => {
        updatedGroupedData[semester] = groupedData[semester].map(calculateRowTotal);
    });

    return (
        <>
            <style>
                {`
                    .custom-table {
                        font-size: 10px !important;
                        overflow: auto;  /* Mencegah tabel melebar keluar */
                        margin-bottom: 20px !important;  /* Memberi jarak antar tabel */
                        width: 100% !important;
                    }

                    .custom-table .ant-table {
                        font-size: 10px !important;
                    }

                    .custom-table .ant-table-thead > tr > th {
                        font-size: 11px !important;
                        padding: 2px 4px !important;
                        border: 1px solid black !important;
                        background-color: #d9d9d9;
                        text-align: center;
                    }

                    .custom-table .ant-table-tbody > tr > td {
                        font-size: 10px !important;
                        padding: 2px 4px !important;
                        border: 1px solid black !important;
                    }

                    .custom-table .ant-table-summary {
                        font-size: 10px !important;
                        font-weight: bold;
                        background-color: #f0f0f0;
                    }

                    .custom-table .ant-table-summary tr td {
                        padding: 5px !important;
                        text-align: center !important;
                        font-weight: bold !important;
                        min-width: 30px !important; /* Menyesuaikan lebar di summary */
                    }
                `}
            </style>
                <div style={{ padding: "20px", width: "100%" }}>  
                  {
                    tableRows.map((pair, index) => (
                        <Row gutter={16} key={index} style={{ marginBottom: "20px" }} justify="center">
                            {pair.map(
                            (semester) =>
                                semester && (
                                <Col span={12} key={semester}>
                                    <Title level={4} className="table-title" style={{ textAlign: "center", marginBottom: "10px" }}>Semester {semester}</Title>
                                    <Table
                                        columns={columns}
                                        dataSource={updatedGroupedData[semester]}
                                        rowKey="id"
                                        pagination={false}
                                        bordered
                                        className="custom-table"
                                        summary={() => {
                                            const total = getSummaryData(groupedData[semester]);
                                            return (
                                                <Table.Summary.Row>
                                                    <Table.Summary.Cell index={0} colSpan={2}><b>JUMLAH</b></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={2}><b>{total.total_teori}</b></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={3}><b>{total.total_praktek}</b></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={4}><b>{total.total_sks}</b></Table.Summary.Cell>
                                    
                                                    <Table.Summary.Cell index={5}><b>{total.teori_bt}</b></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={6}><b>{total.teori_pt}</b></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={7}><b>{total.teori_m}</b></Table.Summary.Cell>
                                    
                                                    <Table.Summary.Cell index={8}><b>{total.praktek_bt}</b></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={9}><b>{total.praktek_pt}</b></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={10}><b>{total.praktek_m}</b></Table.Summary.Cell>
                                    
                                                    <Table.Summary.Cell index={11}><b>{total.total_beban}</b></Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            );
                                        }}
                                    />
                                </Col>
                                )
                            )}
                        </Row>
                    ))
                  }
            </div>
        </>
    );
}

export default SebaranMKTable;