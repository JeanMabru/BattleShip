package bship_classes;

public class Bship_grid {

	private int i_id;
	private int i_x;
	private int i_y;
	private int i_state;
	
	
	public Bship_grid()
	{
		i_state = 1;		
	}
	
	public Bship_grid(int id, int x, int y, int state)
	{
		this.i_id = id;
		this.i_x = x;
		this.i_y = y;
		this.i_state = state;	
	}
	
	public int getI_id() {
		return i_id;
	}

	public void setI_id(int i_id) {
		this.i_id = i_id;
	}

	public int getI_x() {
		return i_x;
	}

	public void setI_x(int i_x) {
		this.i_x = i_x;
	}

	public int getI_y() {
		return i_y;
	}

	public void setI_y(int i_y) {
		this.i_y = i_y;
	}

	public int getI_state() {
		return i_state;
	}

	public void setI_state(int i_state) {
		this.i_state = i_state;
	}
	
	
	
}
