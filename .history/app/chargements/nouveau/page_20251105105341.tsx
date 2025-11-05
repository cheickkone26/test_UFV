"use client";


import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NouveauChargementPage() {
    const router = useRouter();
    const [clients, setClients] = useState<any[]>([]);
    const [transports, setTransportes] = useState<any[]>([]);
    const [produits, setProduits] = useState<any[]>([]);
    const [form, setForm] = useState({client_id: "", transport_id: ""});
    const [lignes, setLignes] = useState<{produit_id: string; quantite: number | string}[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from("clients").select("id, nom").order("nom");
            const [c, t, p] = await Promise.all([
                supabase.from("clients").select("id, nom"),
                supabase.from("transports").select("id, nom"),
                supabase.from("produits").select("id, nom"),
            ])
            setClients(c.data || []);
            setTransportes(t.data || []);
            setProduits(p.data || []);
        }
        fetchData();
    }, []);

    const addLigne = () => {
        setLignes([...lignes, {produit_id: "", quantite: ""}]);
    }
  //suppression d'une ligne de produit
    const removeLigne = (index: number) => {
        if (lignes.length === 1) return;
        setLignes(lignes.filter((_, i) => i !== index));
    }
    
    const handleSave = async () => {
        if (!form.client_id || !form.transport_id ) {
            alert("Veuillez selectionner un client et un transporteur");
            return;
        }
        if (lignes.length === 0) {
            alert("Veuillez ajouter au moins un produit");
            return;
        }
        if (lignes.some(l => !l.produit_id || !l.quantite )) {
            alert("Veuillez remplir tous les champs des lignes produits");
            return;
        }
        setLoading(true);
        const { data: newChargement, error: chargementError } = await supabase
            .from("chargements")
            .insert([{ client_id: form.client_id, transport_id: form.transport_id, date_chargement: new Date().toISOString() }])
            .select()
            .single();
            if (chargementError) {
                alert("Erreur lors de la création du chargement : " + chargementError.message);
                setLoading(false);
                return;
            }   

        const produitsToInsert = lignes.map(l => ({
            chargement_id: newChargement.id,
            produit_id: l.produit_id,
            quantite: l.quantite,
        }))

        const { error: produitsError } = await supabase
            .from("chargement_produits")
            .insert(produitsToInsert);
        setLoading(false);
        if (produitsError) {
            alert("Erreur lors de l'ajout des produits : " + produitsError.message);
            return;
        }
        alert("Chargement créé avec succès !");
        router.push("/chargements");
    }
     return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6"> Nouveau chargement</h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Client :</label>
        <select
          className="border p-2 w-full"
          onChange={e => setForm({ ...form, client_id: e.target.value })}
        >
          <option value="">-- Sélectionner un client --</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>
              {c.nom}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Transporteur :</label>
        <select
          className="border p-2 w-full"
          onChange={e => setForm({ ...form, transport_id: e.target.value })}
        >
          <option value="">-- Sélectionner un transporteur --</option>
          {transports.map(t => (
            <option key={t.id} value={t.id}>
              {t.nom}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-lg font-semibold mb-2">Produits :</h2>

      {lignes.map((l, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <select
            className="border p-2 flex-1"
            value={l.produit_id}
            onChange={e => {
              const newLines = [...lignes]
              newLines[i].produit_id = e.target.value
              setLignes(newLines)
            }}
          >
            <option value="">-- Produit --</option>
            {produits.map(p => (
              <option key={p.id} value={p.id}>
                {p.nom}
              </option>
            ))}
          </select>
          <label>Quantite

            <input
            type="number"
            min={1}
            value={l.quantite}
            className="border p-2 w-24"
            onChange={e => {
              const newLines = [...lignes]
              newLines[i].quantite = Number(e.target.value)
              setLignes(newLines)
            }}
          /> 
          
          </label>
          
          
          {lignes.length > 1 && (
            <button
              onClick={() => removeLigne(i)}
              className="text-red-600"
            >
              ❌
            </button>
          )}
        </div>
      ))}

      <button onClick={addLigne} className="text-blue-600 mb-4">
        ➕ Ajouter un produit
      </button>

      <div>
        <button
          onClick={handleSave}
          disabled={loading}
          className={`bg-green-600 text-white px-4 py-2 rounded ${
            loading ? 'opacity-50' : 'hover:bg-green-700'
          }`}
        >
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
   
}
    