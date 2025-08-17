# Technical Implementation Notes

## State Management Strategy
```jsx
// Global App State (React Context)
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);
  
  return (
    <AppContext.Provider value={{
      user, setUser,
      theme, setTheme,
      notifications, setNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Local Component State (Zustand)
const useDiscoveryStore = create((set, get) => ({
  discoveries: [],
  filters: {
    category: 'all',
    difficulty: 'all',
    saved: false
  },
  loading: false,
  
  setDiscoveries: (discoveries) => set({ discoveries }),
  updateFilters: (newFilters) => set(state => ({
    filters: { ...state.filters, ...newFilters }
  })),
  setLoading: (loading) => set({ loading })
}));
```

## API Integration Patterns
```jsx
// API Service Layer
class ApiService {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL;
  }
  
  async fetchDiscoveries(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${this.baseURL}/discoveries?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch discoveries');
    }
    
    return response.json();
  }
  
  async saveAutomation(automationId) {
    const response = await fetch(`${this.baseURL}/automations/${automationId}/save`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.json();
  }
}

// React Query Integration
const useDiscoveries = (filters) => {
  return useQuery({
    queryKey: ['discoveries', filters],
    queryFn: () => apiService.fetchDiscoveries(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

---
