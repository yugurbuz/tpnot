import { useEffect, useState } from "react";
import Records from "./data/ifadeler.json";
import "./style.css";

export default function App() {
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    setFacts(Records);
  }, []);

  return (
    <>
      <div className="container">
        <Header />
        <SearchForm setData={setFacts} />

        <main className="main">{<FactsList facts={facts} />}</main>
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Today I Learned" />
        <h1>Hazır İfadeler</h1>
      </div>
    </header>
  );
}

function SearchForm({ setData }) {
  function searchContent(e) {
    e.preventDefault();

    const searchData = Records.filter(function (record) {
      return (
        record.content.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
        -1
      );
    });
    setData(searchData);
  }

  return (
    <form className="fact-form">
      <input
        type="text"
        placeholder="Hazır ifade arayınız..."
        onChange={searchContent}
      />
    </form>
  );
}

function FactsList({ facts }) {
  if (facts.length === 0) {
    return (
      <p className="message">
        Kayıtlı ifade bulunamamıştır. Lütfen ifade ekleyiniz... ✌
      </p>
    );
  }
  return (
    <section>
      <ul>
        {facts.map((fact) => (
          <Fact fact={fact} key={fact.id} />
        ))}
      </ul>
      <p>Toplamda {facts.length} adet hazır ifadeniz bulunmaktadır</p>
    </section>
  );
}

function Fact({ fact }) {
  function CopyText(id) {
    // Get the text field
    var copyText = document.getElementById("1").innerText;
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
  }
  return (
    <li className="fact">
      <p id={fact.id}>{fact.content}</p>
      <div className="copy-buttons">
        <button onClick={() => CopyText(fact.id)}>Kopyala</button>
      </div>
    </li>
  );
}
