"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ChargementsPage() {
  const [chargements, setChargements] = useState<any[]>([]);

//affichage des chargements 
  useEffect(() => {
    const fetchChargements = async () => {
      const { data, error } = await supabase
        .from("chargements")
        .select(`
          id,
          date_chargement,
          client_id(nom),
          transport_id(nom),
          chargement_produits(
          id,
          produit_id(nom),
          quantite
          )
        `)
        .order("date_chargement", { ascending: true })
        
        if (error) {
          console.error("Erreur lors de la récupération des chargements :", error);
        } else {
          console.log("données chargées :", data);
          setChargements(data || []);
        }
        
    };
      fetchChargements();
    }, []);
  
    return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold items-center"> CHARGEMENTS </h1>
        <Link
          href="/chargements/nouveau"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Nouveau chargement
        </Link>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Client</th>
            <th className="border p-2 text-left">Transporteur</th>
            <th className="border p-2 text-left">Produits</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {chargements.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="border p-2">{c.client_id?.nom}</td>
              <td className="border p-2">{c.transport_id?.nom}</td>
              <td className="border p-2">{c.chargement_produits?.length ?(
                <ul>
                  {c.chargement_produits.map((cp: any) => (
                    <li key={cp.id}>{cp.produit_id?.nom} / <span>Qte : </span>{cp.quantite}</li>
                  ))}
                </ul>
              ) : (
                "Aucun produit"
              )}</td>
              <td className="border p-2 text-center">
                {new Date(c.date_chargement).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )




}