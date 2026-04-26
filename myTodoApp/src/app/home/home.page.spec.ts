import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { TodoService } from './services/todo.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    // Configure the test module for a standalone component
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [TodoService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
