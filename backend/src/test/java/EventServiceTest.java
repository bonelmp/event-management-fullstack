import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;

import com.example.demo.Event;
import com.example.demo.EventRepository;
import com.example.demo.EventService;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {
    
    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private EventService eventService;

    @Test
    void testCreateEvent_Success(){
        Event testEvent = new Event();
        testEvent.setTitle("Java Workshop");

        when(eventRepository.save(any(Event.class))).thenReturn(testEvent);

        Event result = eventService.createEvent(testEvent);

        assertNotNull(result);
        assertEquals("Java Workshop", result.getTitle());
    }
    @Test
    void testGetEventById_NotFound(){
        when(eventRepository.findById(anyLong())).thenReturn(java.util.Optional.empty());

        Event result = eventService.getEventById(1L);

        assertNull(result);

        verify(eventRepository).findById(1L);
    }
}
