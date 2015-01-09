package Model;

import java.util.ArrayList;
import java.util.Iterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

//Définit une case
public class Case {
	// cree case
	Case(int x,int y,String s){
		this.x=x;
		this.y=y;
		this.status=s;		
	}
	
	//parametre de la case
	private int x;
	private int y;
	private String status;
	
	//converti l'objet case en un objet JSON
	private JSONObject toJSON(){
		return null;		
	} 
	
	//Ajoute case au plateau
	private void addtoPlateau(ArrayList<Case> Plateau,Case Ajoute) {
	}
	
	//Converti Plateau en JSONArray
	/*private static JSONArray toJSONArray(ArrayList<Case> P){
		JSONArray jsonarrayfinal;
		
		ArrayList arrayList;
		
		//parcourir tableau iterator
		Iterator<Object> it = arrayList.iterator();
		while(it.hasNext())
		{
		    Object obj = it.next();
		    //Do something with obj
		}

		return jsonarrayfinal;	
	}*/
	
	@Override
	public String toString() {
		return "Case [x=" + x + ", y=" + y + ", state=" + status + "]";
	}
	
	public static void main(String []args){
		ArrayList<Case> Plateau = new ArrayList<Case>();
		System.out.println("coucou");
		// code qui sera dans le servlet
		
		// on définit 4 cases
		Case A = new Case(1,1,"vide");
		Case B = new Case(1,2,"toucher");
		Case C = new Case(2,1,"ok");
		Case D = new Case(2,2,"ko");
		
		// on ajoute au plateau les 4 cases
		Plateau.add(A);
		Plateau.add(B);
		Plateau.add(C);
		Plateau.add(D);
		System.out.println(Plateau);	
		
		//JSONArray myjson = toJSONArray(Plateau);
		
		// autant de plateau (JSON array) que de joueur
		
		
	}
	
	
}

