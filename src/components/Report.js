import {} from "reactstrap";

const Report = () => {
  return (
    <table id="q-graph">
      <caption>Quarterly Results</caption>
      <thead>
        <tr>
          <th></th>
          <th class="sent">Invoiced</th>
          <th class="paid">Collected</th>
        </tr>
      </thead>
      <tbody>
        <tr class="qtr" id="q1">
          <th scope="row">Q1</th>
          <td class="sent bar">
            <p>$18,450.00</p>
          </td>
          <td class="paid bar">
            <p>$16,500.00</p>
          </td>
        </tr>
        <tr class="qtr" id="q2">
          <th scope="row">Q2</th>
          <td class="sent bar">
            <p>$34,340.72</p>
          </td>
          <td class="paid bar">
            <p>$32,340.72</p>
          </td>
        </tr>
        <tr class="qtr" id="q3">
          <th scope="row">Q3</th>
          <td class="sent bar">
            <p>$43,145.52</p>
          </td>
          <td class="paid bar">
            <p>$32,225.52</p>
          </td>
        </tr>
        <tr class="qtr" id="q4">
          <th scope="row">Q4</th>
          <td class="sent bar">
            <p>$18,415.96</p>
          </td>
          <td class="paid bar">
            <p>$32,425.00</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Report;
