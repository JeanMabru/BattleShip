package bship_gridServlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import bship_classes.Bship_grid_global;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.sun.org.apache.xerces.internal.impl.xpath.regex.ParseException;

public class Bship_gridServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Bship_gridServlet(){
		super();
	}
	
	@Override
	
	public void init() throws ServletException{
		super.init();
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		//System.out.println("bfdhjrf");
//		Bship_grid_global player_grid = new Bship_grid_global();
//		player_grid.setI_Board_size(20);
		
		resp.setContentType("application/json");
		JSONObject jsonToSend;
		jsonToSend = new JSONObject();
		
		//jsonToSend.put("grid_size", player_grid.getI_Board_size());
		
		PrintWriter out = resp.getWriter();
		out.write(jsonToSend.toString());
		
		//pour recuperer la grid du js
		String gridValue = req.getParameter("grid");
		//System.out.println(gridValue);
		JSONParser parser = new JSONParser();
		Object obj = null;
			try {
				obj = parser.parse(gridValue);
				
			} catch (org.json.simple.parser.ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

	}
}
